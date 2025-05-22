package com.example.tokolaptop.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dashboard_stats")
public class DashboardStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jumlah_pesanan")
    private int jumlahPesanan;

    @Column(name = "jumlah_pengunjung")
    private int jumlahPengunjung;

    @Column(name = "total_pendapatan")
    private BigDecimal totalPendapatan;

    public DashboardStats() {
        // Default constructor JPA
    }

    public DashboardStats(int jumlahPesanan, int jumlahPengunjung, BigDecimal totalPendapatan) {
        this.jumlahPesanan = jumlahPesanan;
        this.jumlahPengunjung = jumlahPengunjung;
        this.totalPendapatan = totalPendapatan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getJumlahPesanan() {
        return jumlahPesanan;
    }

    public void setJumlahPesanan(int jumlahPesanan) {
        this.jumlahPesanan = jumlahPesanan;
    }

    public int getJumlahPengunjung() {
        return jumlahPengunjung;
    }

    public void setJumlahPengunjung(int jumlahPengunjung) {
        this.jumlahPengunjung = jumlahPengunjung;
    }

    public BigDecimal getTotalPendapatan() {
        return totalPendapatan;
    }

    public void setTotalPendapatan(BigDecimal totalPendapatan) {
        this.totalPendapatan = totalPendapatan;
    }
}
