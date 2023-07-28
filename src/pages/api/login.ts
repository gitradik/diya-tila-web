// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fbAuth } from '../../../firebaseConfig';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === `POST`) {
    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(fbAuth, email, password);
      // // The user is authenticated, you can use userCredential.user to get user data if needed
      console.log(`userCredential:`, userCredential);
      res.status(200).json({ message: `Login successful` });
    } catch (error) {
      res.status(401).json({ error: `Invalid credentials` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed` });
  }
};
