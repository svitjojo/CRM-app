import { type ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

export async function setUpRecaptcha (telNumber: string): Promise<ConfirmationResult | null> {
  try {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    recaptchaVerifier.render();

    const confirmationResult = await signInWithPhoneNumber(auth, `+${telNumber}`, recaptchaVerifier);

    return confirmationResult;
  } catch (error) {
    throw Error('', error as Error);
  }
}
