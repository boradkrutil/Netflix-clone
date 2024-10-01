import JWT from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVARs.js';

export const generateToken = (userId, res) => {
    const token = JWT.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '30d' });
    res.cookie("jwt-netflix", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
        secure : ENV_VARS.NODE_ENV !== 'devlopment'
    });
    return token;
}