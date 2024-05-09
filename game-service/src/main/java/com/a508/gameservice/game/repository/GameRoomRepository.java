package com.a508.gameservice.game.repository;

import com.a508.gameservice.game.domain.GameRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRoomRepository extends CrudRepository<GameRoom, String> {

    Page<GameRoom> findAll(Pageable pageable);
}
