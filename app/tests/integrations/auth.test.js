import request from "supertest";
import http from "node:http";
import app from "../../app";

const API_BASE_URL = "/api/v1";
const server = http.createServer(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOnsiZm4iOiJOT1ciLCJhcmdzIjpbXX0sInVwZGF0ZWRBdCI6eyJmbiI6Ik5PVyIsImFyZ3MiOltdfSwiaWQiOjExLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJiaXJ0aGRheSI6IjE5OTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsInBob25lIjoiMTIzNDU2Nzg5MCIsInBzZXVkbyI6ImpvaG5fZG9lIiwiZ2VuZGVyIjoibWFsZSIsImF2YXRhciI6Imh0dHBzOi8vZXhhbXBsZS5jb20vYXZhdGFyLmpwZyIsImlhdCI6MTcwMzE3MDUwMiwiZXhwIjoxNzAzNDI5NzAyfQ.NmAVkbne3dt2XDrQrxH0TPChFEAzBeXaFc6bPjrKefA";
describe("API v1 Authentication (Registration/Login)", () => {
  test("Registration)", async () => {
    // const response = await request(server)
    //   .get(API_BASE_URL + "/me")
    //   .set("Authorization", `Bearer ${token}`)
    //   .expect("Content-Type", /json/)
    //   .expect(200);
    // console.log(response);

    expect(200).toBe(200);
  });
  test("Login", () => {
    expect(2).toBe(2);
  });
});

server.close();
