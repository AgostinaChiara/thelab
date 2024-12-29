import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await User.create({
      username: username,
      password: hashedPassword,
    })

    res.status(201).json({
      msg: `User: ${username} creado con exito!`,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Upps, ocurrio un error :(', error
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: any = await User.findOne({ where: { username: username } })

  if (!user) {
    return res.status(400).json({
      msg: `El usuario ${username} no existe`
    })
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).json({
      msg: `Contraseña incorrecta`
    })
  }

  const token = jwt.sign({
    id: user.id,
    username: username,
  }, process.env.SECRET_KEY || '123')
  res.json({ token })
}