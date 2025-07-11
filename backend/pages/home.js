import supabase from "../config/supabaseclient";

const Home = () => {
    console.log(supabase)

    return (
        <div className="page home">
            <h1>Welcome to B&M Cosmetics</h1>
            <p>Your one-stop shop for all your cosmetic needs!</p>
        </div>
    )
}

export default Home;