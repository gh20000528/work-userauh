import jwt from 'jsonwebtoken';


interface UserInfo {
    user_id: String,
    username: String,
    role_id: Number
}

const jwtSecret = process.env.JWT_SECRET || 'default_secret';
// token生成
export const generateToken = (user: UserInfo) => {
    return jwt.sign(
        { username: user.username, role: user.role_id },
        jwtSecret,
        { expiresIn: '10h' }
    );
};