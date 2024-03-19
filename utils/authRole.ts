import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt, { VerifyErrors } from 'jsonwebtoken';

interface DecodedToken {
    username: string;
    role_id: number;
}

export const authenticateRole = (roles: number[]) => (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        if (!decoded || !roles.includes(decoded.role_id)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        req.user = decoded;
        next();

    });
    
};