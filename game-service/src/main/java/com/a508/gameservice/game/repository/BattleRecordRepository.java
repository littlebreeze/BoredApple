package com.a508.gameservice.game.repository;

import com.a508.gameservice.game.domain.BattleRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BattleRecordRepository extends JpaRepository<BattleRecord,Integer> {

}
