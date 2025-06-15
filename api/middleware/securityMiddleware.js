import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// More strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts from this IP, please try again after an hour'
});

// Security middleware setup function
export const setupSecurityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());
  
  // Compress all responses
  app.use(compression());
  
  // Apply rate limiting
  app.use('/api/', apiLimiter);
  app.use('/api/users/login', authLimiter);
  app.use('/api/users/register', authLimiter);
  
  // Set secure cookies
  app.use((req, res, next) => {
    res.cookie('secureCookie', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    next();
  });
  
  // CORS enhancement
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
};