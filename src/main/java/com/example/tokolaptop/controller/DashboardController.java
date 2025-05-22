package com.example.tokolaptop.controller;

import com.example.tokolaptop.model.DashboardStats;
import com.example.tokolaptop.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        DashboardStats stats = dashboardService.getStats();

        Map<String, Object> data = new HashMap<>();
        data.put("jumlahPesanan", stats.getJumlahPesanan());
        data.put("jumlahPengunjung", stats.getJumlahPengunjung());
        data.put("totalPendapatan", stats.getTotalPendapatan());



    data.put("labels", List.of("Jan", "Feb", "Mar", "Apr", "Mei", "Jun"));
    data.put("orders", List.of(50, 70, 60, 90, 100, 80));
    data.put("visitors", List.of(200, 250, 220, 300, 280, 310));
    data.put("revenue", List.of(10000000, 15000000, 12000000, 20000000, 22000000, 18000000));

        return data;
    }
}
