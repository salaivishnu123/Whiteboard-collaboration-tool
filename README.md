# Online Whiteboard Collaboration (REST-only)

This project contains a React frontend (`reactapp`, port 8081) and a Spring Boot backend (`springapp`, port 8080) using MySQL.

Run order:
- Start MySQL locally (user: root, password: examly) and ensure `appDB` is accessible.
- In `springapp`, run the Spring Boot app.
- In `reactapp`, run the React dev server.

Environment:
- React dev server listens on http://localhost:8081
- Backend API at http://localhost:8080

Notes:
- WebSocket features from the SRS are deferred. Presence and collaboration are via REST placeholders for now.
- Templates, workspaces, and whiteboards endpoints are implemented per SRS.# afe495df-4963-4c72-875c-2d930b7c3c69-b089b7fb-c144-4dd5-be7e-9ba4b3eab3c6
https://sonar.server.examly.io/dashboard?id=iamneo-production_afe495df-4963-4c72-875c-2d930b7c3c69-b089b7fb-c144-4dd5-be7e-9ba4b3eab3c6&amp;codeScope=overall
