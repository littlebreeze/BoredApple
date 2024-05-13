import math
from flask import Flask
from flask import request
from flask import jsonify

import fasttext

model = fasttext.load_model("fasttext.bin")
import MeCab
import hgtk

ftmodel = fasttext.load_model("fasttext.bin")


def word_to_jamo(tk):
    def to_special_token(jamo):
        if not jamo:
            return '-'
        else:
            return jamo

    decomposed_token = ''
    for char in tk:
        try:
            # char(음절)을 초성, 중성, 종성으로 분리
            cho, jung, jong = hgtk.letter.decompose(char)

            # 자모가 빈 문자일 경우 특수문자 -로 대체
            cho = to_special_token(cho)
            jung = to_special_token(jung)
            jong = to_special_token(jong)
            decomposed_token = decomposed_token + cho + jung + jong

        # 만약 char(음절)이 한글이 아닐 경우 자모를 나누지 않고 추가
        except Exception as exception:
            if type(exception).__name__ == 'NotHangulException':
                decomposed_token += char

    # 단어 토큰의 자모 단위 분리 결과를 추가
    return decomposed_token


def tokenize_by_jamo(st):
    speech = ['VV', 'VX', 'VCP', 'VCN', 'NNG', 'NNP', 'NNB', 'NP', 'NR', 'NT']
    out = mecab.parse(st)
    result = []
    vn = []
    partofspeech = ""
    for line in out.split("\n"):
        if line.strip() != "":  # 빈 줄은 건너뜀
            token = line.split("\t")[0]  # 탭으로 분리된 첫 번째 토큰(형태소)을 추출
            if len(line.split("\t")) > 1: partofspeech = line.split("\t")[1].split(',')[0]
            if token == "EOS": break;
            result.append(token.strip())
            if partofspeech in speech: vn.append(token.strip())
    return vn


mecabrc_path = "/usr/local/lib/python3.10/site-packages/mecab_ko_dic/dicdir/mecabrc"
mecab = MeCab.Tagger(f'-d /usr/local/lib/python3.10/site-packages/mecab_ko_dic/dicdir -r {mecabrc_path}')


app = Flask(__name__)

evenrankmag = [0, 1, 0.66, 0.33, -0.33, -0.66, -1]
oddrankmag = [0, 1, 0.5, 0, -0.5, -1]


def calculate_elo(rank, a, b, id, players):
    res = []
    res.append(rank)
    res.append(id)
    ea = 1 / (1 + math.pow(10, (b - a) / 400))
    if players % 2 == 0:
        t = int((6 - players) / 2)
        res.append(int(32 * ea * evenrankmag[t + rank]))
        res.append(a + int(32 * ea * evenrankmag[t + rank]))
        return res

    t = int((5 - players) / 2)
    res.append(int(32 * ea * oddrankmag[t + rank]))
    res.append(a + int(32 * ea * oddrankmag[t + rank]))
    return res


@app.route('/elo', methods=['POST'])
def scorecal():
    data = request.json
    newelo = []
    for i in data:
        eloavg = 0
        for j in data:
            if i == j: continue
            eloavg = eloavg + int(j[1])
        print(int(eloavg / len(data)))

        newelo.append(calculate_elo(i[0], i[2], int(eloavg / len(data)), i[1], len(data)))

    return newelo


def cosine_similarity(vec1, vec2):
    dot_product = sum(x * y for x, y in zip(vec1, vec2))
    magnitude = (sum(x ** 2 for x in vec1) ** 0.5) * (sum(x ** 2 for x in vec2) ** 0.5)
    if magnitude == 0:
        return 0  # 분모가 0이면 유사도를 0으로 반환
    return dot_product / magnitude


@app.route('/sim', methods=['POST'])
def similarity():
    sim = 100
    data = request.json
    a = tokenize_by_jamo(data[0])
    b = tokenize_by_jamo(data[1])
    sensim = cosine_similarity(ftmodel.get_sentence_vector(word_to_jamo(a)),
                               ftmodel.get_sentence_vector(word_to_jamo(b)))
    c1 = [0 for _ in range(len(a))]
    c2 = [0 for _ in range(len(b))]
    print(a, b)
    for i in range(len(a)):
        aa = a[i]
        t = 0
        for j in range(len(b)):
            bb = b[j]
            if aa == bb:
                c1[i] = 1
                c2[j] = 1
                t = 1
                break
    for i in range(len(c1)):
        if c1[i] == 0:
            sim = sim - 100 / len(c1)

            jamo = word_to_jamo(a[i])
            max = 0
            for j in range(len(c2)):
                j2 = word_to_jamo(b[j])
                cosim = cosine_similarity(ftmodel.get_word_vector(jamo), ftmodel.get_word_vector(j2))
                if max < cosim: max = cosim
            sim = sim + 100 / len(c1) * max

    for i in range(len(c2)):
        if c2[i] == 0:
            sim -= 1
    finalsim = (sim / 100 + sensim) / 2
    return jsonify({"ratio": str(int(finalsim * 100))})


@app.route('/hello', methods=['GET'])
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082)
