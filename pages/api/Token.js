
export default async function (req, res) {
    try {
        const { cookies } = req
        const jwt = cookies.jwt_token
        if (!jwt) {
            res.status(400).json("No token")
        }
        res.status(200).send(jwt)
    } catch (err) {
        res.status(500).json('serverError')
    }
}