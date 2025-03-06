const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models')

const generateJwt = (id, email, isAdmin) => {
    return jwt.sign({id, email, isAdmin}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController {

    async registration(req, res, next) {
        const { username, email, password, isAdmin } = req.body;
    
        // Проверка на наличие обязательных полей
        if (!email || !password) {
            return next(ApiError.BadRequest('Некорректный email или пароль'));
        }
    
        // Задание значения username как null, если он не указан
        const userNameToUse = username || null;
    
        // Проверка на существование пользователя с таким email
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.BadRequest('Такой пользователь уже существует'));
        }
    
        // Хеширование пароля
        const hashPassword = await bcrypt.hash(password, 5);
    
        // Создание нового пользователя
        const user = await User.create({
            username: userNameToUse, 
            email, 
            password: hashPassword, 
            isAdmin: isAdmin || false // Проверка, если isAdmin не указано, по умолчанию false
        });
    
        // Создание корзины для пользователя
        const cart = await Cart.create({ userId: user.id });
    
        // Генерация токена
        const token = generateJwt(user.id, email, user.isAdmin); // Используем user.isAdmin
    
        return res.json({ token })
    }
    
    
    
    async login(req,res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.BadRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.BadRequest('неправильный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.isAdmin)
        return res.json({token})
    }

    async check(req,res,next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.isAdmin)
        return res.json({token})
    }

    }

module.exports = new UserController()