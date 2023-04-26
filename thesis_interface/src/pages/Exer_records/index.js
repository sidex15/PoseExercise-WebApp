import Layout from "@/components/Layout";

const ExerRecords = () => {
    return ( <Layout>
        <div className="absolute overflow-scroll h-full w-full flex justify-center lg:pt-24 pt-9">
            <div className="w-4/5">
                <h1 className='font-mono font-bold lg:text-6xl text-xl text-cyan-blue'>Your Exercise Session Records</h1>
                <div className="bg-grey lg:mt-7 mt-4 p-3">
                    container for exercise records pulled from database
                </div>
            </div>
            
        </div>
        </Layout>
     );
}
 
export default ExerRecords;