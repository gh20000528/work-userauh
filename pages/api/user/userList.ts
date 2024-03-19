import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/pages/model';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';


// 使用者表單
export default async function userList(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    try {
        
        const allUsers = await User.findAll()     
        
        res.status(200).json({ user: allUsers})
    } catch (error) {
        return res.status(500).json({ message: "something error please check"})
    }
}