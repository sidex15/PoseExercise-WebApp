import clientPromise from "../../../lib/mongodb";


export async function getStaticProps() {
    const mongoClient = await clientPromise
    const data = await mongoClient.db('thesis').collection('thesis').find().toArray();
    console.log('!!!',data)
    return {
      props: {}, // will be passed to the page component as props
    }
};

function test() {
    return(
        <h1>Helooo</h1>
    )
}
   
export default test; 