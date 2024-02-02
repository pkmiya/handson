import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
});

type User = z.infer<typeof UserSchema>;

const user: User = {username: "John"};

const result = UserSchema.parse(user);
console.log(result);