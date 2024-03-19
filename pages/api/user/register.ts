import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { User } from '@/pages/model';
import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
    voice_attachment: yup.boolean().required(),
    role_id: yup.number().required()
})

// 註冊
export default async function register (req: NextApiRequest, res: NextApiResponse){
    // 驗證user輸入
    const validatedData = await schema.validate(req.body, {abortEarly: false});

    const { username, password, voice_attachment, role_id } = validatedData;

    try {
        // 驗證user是否存在
        const existingUser = await User.findOne({ where: { username: username }})

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists'})
        }

        // 密碼加密
        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hashSync(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            voice_attachment,
            role_id
        })

        res.status(200).json({ message: 'New user success' })
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ message: 'Validation error please check input' })
        }
        return res.status(500).json({ message: 'something error' })
    }
}   