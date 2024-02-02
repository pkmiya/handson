'use client';
import { useEffect } from "react";
import { z } from "zod";

const UserSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
});

type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
};

const User = () => {
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('http://localhost:3000/api');
            const user: UserType = await response.json();
            const validatedUser = UserSchema.parse(user);
            console.log(validatedUser.firstName);
        };

        getUser();
    });

    return <div>User</div>;
}

export default User;