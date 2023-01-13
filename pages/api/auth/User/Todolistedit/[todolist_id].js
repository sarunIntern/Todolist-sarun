const { conn } = require("../../../../../DB/pgconfig")

async function todlistedit(req, res) {
    const { todolist_id } = req.query;
    try {

        const todolists = await conn("SELECT * FROM todolist WHERE todolist_id = $1 ", [todolist_id])
        if (todolists.length < 1) {
            res.status(200).json({ todolists: todolists, category: todolists, lists: todolists, categoryname: todolists })
        } else {
            const users_id = await todolists[0].fk_todolist_user_id
            const category_id = await todolists[0].fk_category_id
            const categorys = await conn("SELECT * FROM category WHERE (fk_user_id IS NULL OR fk_user_id = $1 ) ORDER BY category_id ASC", [users_id])
            const categoryname = await conn("SELECT * FROM category WHERE category_id = $1 ORDER BY category_id ASC", [category_id])
            const lists = await conn("SELECT * FROM lists WHERE fk_todolist_id = $1 ORDER BY lists_id ASC", [todolist_id])
            res.status(200).json({ todolists: todolists, category: categorys, lists: lists, categoryname: categoryname })
        }

        // res.status(200).json(category_name)
    } catch (err) {
        // console.log(err)
        res.status(500).json("TODOLISTEDIT SERVER ERROR !!!")
    }
}

export default todlistedit