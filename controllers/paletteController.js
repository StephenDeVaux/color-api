const { Pool } = require('pg')
const pool = new Pool({ database: 'colors_api', password: 'password' })

module.exports = { 
    colors: (req, res) => {
        pool.query('select * from colors;', [], (err, db) => {
            res.json({message: "ok", data: db.rows})
    
        })
    },
    palettes: (req, res) => {
        pool.query('select * from palettes;', [], (err, db) => {
            res.json({message: "ok", data: db.rows})
    
        })
    },
    paletteByUser: (req, res) => {
        const sql = `select * from favourites where user_id = ${req.params.user_id};`
        pool.query(sql, [], (err, db) => {
            res.json({message: "ok", data: db.rows})
        })
    },
    createPalette: (req, res) => {
        const sql = 'INSERT INTO palettes (primary_color_hex, secondary_color_hex, tertiary_color_hex, quaternary_color_hex, quinary_color_hex) values ($1, $2, $3, $4, $5);'
        console.log(req.body.primary_color_hex)
        // console.log(sql)
        pool.query(sql, [
            req.body.primary_color_hex,
            req.body.secondary_color_hex,
            req.body.tertiary_color_hex,
            req.body.quaternary_color_hex,
            req.body.quinary_color_hex,
        ], (err, db) => {
            if (err) {
                res.json({
                    message: 'invalid request'
                }, 400)
            } else {
                res.json({
                    message: 'palette created'
                }, 201)
            }
        })
    },
    addFavourite: (req, res) => {
        const sql = 'INSERT INTO favourites (user_id, palette_id) values ($1, $2);'
        console.log(req.body.primary_color_hex)
        // console.log(sql)
        pool.query(sql, [
            req.body.user_id, req.body.palette_id
        ], (err, db) => {
            if (err) {
                res.json({
                    message: 'invalid request'
                }, 400)
            } else {
                res.json({
                    message: 'added pallet to favourites'
                }, 201)
            }
        })
    }
}