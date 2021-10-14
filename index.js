require('dotenv').config()
const express = require('express')
const path = require('path');
const exphbs = require('express-handlebars')
const User = require('./models/User')
const connection = require('./db/database')
const Address = require('./models/Address')
const app = express()


app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//USER MODEL
app.get('/users/create', async (req, res)=> {
 res.render('adduser')
})

app.post('/users/create', async (req, res)=> {
    const name  = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }
    // console.log(req.body);
    
    await User.create({ name, occupation, newsletter })
    res.redirect('/')
})

app.get('/users/:id', async (req, res)=> {
    const { id } = req.params
    const user = await User.findOne({ 
        raw: true, 
        where: { id: id }
    })
    res.render('userview', { user })
})

app.post('/users/delete/:id', async (req, res)=> {
    const { id } = req. params
    await User.destroy({ 
        where: { id: id } 
    })
    res.redirect('/')
})

app.get('/users/edit/:id', async (req, res)=> {
    const { id } = req.params

    try {
        const user = await User.findOne({ 
            // raw: true,
            include: Address, 
            where: { id: id }
        })
        res.render('useredit', { user: user.get({ plain: true }) })
        //{ user: user.get({ plain: true }) } //retorna os dados como o raw: true qdo pegamos o relacionamento com outro Model
    }
    catch (error) {
        console.log(error)
    }

})

app.post('/users/update', async (req, res)=> {
    //essa url é inserida no form da pag. useredit
    const { id, name, occupation } = req.body
    let newsletter = req.body.newsletter
    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }    
    const userData = {
        id, name, occupation, newsletter
    }
    await User.update( userData, { where: { id: id }})
    res.redirect('/')
})

app.get('/', async (req, res)=> {

    const users = await User.findAll({ raw: true })//dados prontos
    // console.log(users);
    
    res.render('home', { users })
})

//ADRESS MODEL
app.post('/address/create', async (req, res)=> {
    
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId, street, number, city
    }

    await Address.create(address)
    res.redirect(`/users/edit/${UserId}`)
})

app.post('/address/delete', async (req,res)=> {
    const { UserId, id } = req.body

    await Address.destroy({
        where: { id: id}
    })
    res.redirect(`/users/edit/${UserId}`)
})

///SERVER
const PORT = process.env.PORT
connection //seria o authenticate
    .sync({ force: false })
    .then(()=> {
        app.listen(PORT, ()=> {
            console.log("CONNECTED DATABASE!")
        })
    })
    .catch((err)=> { console.log(err) })
