import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { User } from '@/pages/model';
import * as yup from 'yup';
import { generateToken } from '../../../utils/token';
import Cookies from 'cookies';

// init input validated
const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).required()
})



// 登入
export default async function login(req: NextApiRequest, res: NextApiResponse) {
    // init cookies
    const cookies = new Cookies(req, res);
    // 驗證user輸入
    const validatedData = await schema.validate(req.body, {abortEarly: false});
    try {
        const { username, password } = validatedData;
        // user查詢
        const userLogin = await User.findOne({ where: { username: username }});
        if(!userLogin) {
            return res.status(404).json({ message: 'user not found!!'})
        }
        // 密碼驗證
        const checkPassword = await bcryptjs.compareSync(password, userLogin.dataValues.password);
        if(!checkPassword) {
            return res.status(404).json({ message: 'Password input error please check again'})
        }

        const role = userLogin.dataValues.role_id;
        const userId = userLogin.dataValues.id;
        const userInfo = { user_id: userId, username, role_id: role };
        // token 發送
        const token = generateToken(userInfo);

        // token 儲存
        cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({message: 'login success', token})
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ message: 'Validation error please check input' })
        }
        return res.status(500).json({ message: 'something error' })
    }
}