package com.examly.springapp.model;

import javax.persistence.*;

@Entity
public class Whiteboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;           // Name of the whiteboard
    private Long workspaceId;    // Link to workspace

    @Lob
    private String canvasData;     // Store drawing as JSON/SVG (optional)

    // Constructors
    public Whiteboard() {}

    public Whiteboard(String name, Long workspaceId, String canvasData) {
        this.name = name;
        this.workspaceId = workspaceId;
        this.canvasData = canvasData;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }

    public String getCanvasData() { return canvasData; }
    public void setCanvasData(String canvasData) { this.canvasData = canvasData; }
}
