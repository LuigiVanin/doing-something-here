import jwt from "jsonwebtoken";
import { Err, Ok, Result, Some, Option, None } from "@sniptt/monads/build";
import { z } from "zod";
import { JwtPayload } from "../@types/token/jwt";

export class JwtService {
    decodeJwt(jwtToken: string): Option<JwtPayload> {
        try {
            const value = jwt.verify(jwtToken, "super secret key", {});
            const result = z
                .object({
                    email: z.string().email(),
                    id: z.string(),
                })
                .parse(value);

            return Some(result);
        } catch (err) {
            return None;
        }
    }

    signJwt(data: JwtPayload) {
        return jwt.sign(data, "super secret key", { expiresIn: "6h" });
    }
}
