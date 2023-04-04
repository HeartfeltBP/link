import { app_admin } from './firebase.server'
import { getAuth } from 'firebase-admin/auth'

const auth = getAuth(app_admin)
