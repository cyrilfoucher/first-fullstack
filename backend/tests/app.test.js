import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("API", () => {
  it("doit retourner 404 pour une route inexistante", async () => {
    const response = await request(app).get("/api/route-inexistante");

    expect(response.status).toBe(404);
  });

  it("doit refuser une inscription avec un mot de passe invalide", async () => {
    const response = await request(app).post("/api/auth/register").send({
      prenom: "Cyril",
      nom: "Dupont",
      email: "cyril@example.com",
      motDePasse: "abc",
      confirmationMotDePasse: "abc",
    });

    expect(response.status).toBe(400);
  });
  it("doit refuser l'accès à /api/auth/me sans token", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.status).toBe(401);
  });
});
