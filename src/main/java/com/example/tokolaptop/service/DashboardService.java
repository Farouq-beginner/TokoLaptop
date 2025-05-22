package com.example.tokolaptop.service;

import com.example.tokolaptop.model.DashboardStats;
import com.example.tokolaptop.repository.DashboardStatsRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DashboardService {

    private final DashboardStatsRepository statsRepo;

    public DashboardService(DashboardStatsRepository statsRepo) {
        this.statsRepo = statsRepo;
    }

    public DashboardStats getStats() {
        return statsRepo.findAll().stream()
            .findFirst()
            .orElse(new DashboardStats(0, 0, BigDecimal.ZERO));
    }
}
