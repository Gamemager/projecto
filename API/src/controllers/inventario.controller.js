import { pool } from "../db.js";

export const getInventario= async (req, res) => {
    try{
        const [rows] = await pool.query ('SELECT * FROM inventario')
        res.json(rows);
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}
export const getProducto = async(req, res) => {
    try{
        console.log (req.params.Id)
        const [rows]= await pool.query('SELECT * FROM inventario WHERE Id= ?', [req.params.Id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.json (rows[0])
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const createProducto= async (req, res) => {
    const {Precio, Modelo, Cantidad} =req.body
    try{
        const [rows] = await pool.query('INSERT INTO inventario(Precio, Modelo, Cantidad) VALUES(?,?,?)', [Precio, Modelo, Cantidad, Id_tipoproducto]);
        res.send ({
            Id_tipoproducto: rows.insertId,
            Precio,
            Modelo,
            Cantidad 
        })

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const deleteProducto= async (req, res) => {
    try{
        const [resuld] = await pool.query ('DELETE FROM inventario WHERE Id=?', [req.params.Id])
        
        if (resuld.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no Encontrado'
        })
        res.sendStatus(204)

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const updateProducto= async (req, res) => {
    const {Id_tipoproducto}= req.params
    const {Precio, Modelo, Cantidad } =req.body
   
    try{
        const [resuld]= await pool.query( 'UPDATE inventario SET Precio = IFNULL(?, Precio), Modelo= IFNULL(?,Modelo), Cantidad= IFNULL(?,Cantidad) WHERE Id_tipoproducto = ?', [Precio,Modelo, Cantidad, Id_tipoproducto])
        console.log(resuld)
    
        if (resuld.affectedRows ===0) return res.status(404).json ({
            message: 'Producto no Encontrado'
        })
        const [rows]= await pool.query ('SELECT * FROM inventario WHERE Id_tipoproducto = ?', [Id_tipoproducto])
        res.json(rows[0])
        
    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}
