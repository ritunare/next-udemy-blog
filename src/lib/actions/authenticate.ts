'use server';
import { signIn } from '@/auth'; // signIn関数のインポート
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false, // 自動リダイレクトを無効化
  }); 

  // 認証成功後に手動でリダイレクト
  redirect('/dashboard');

  } catch (error) {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return 'メールアドレスまたはパスワードが正しくありません。';
      default:
        return 'エラーが発生しました。';
    }
  } throw error; 
  }}
