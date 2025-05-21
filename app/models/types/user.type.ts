import { Prisma } from "@prisma/client";

// Définir un sélecteur pour l'utilisateur sans relations car aucune n'existe dans le schéma actuel
export const userSelect = Prisma.validator<Prisma.UserDefaultArgs>()({
    select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
        // Le mot de passe est intentionnellement omis pour des raisons de sécurité
    }
});

export type UserSelect = Prisma.UserGetPayload<typeof userSelect>;