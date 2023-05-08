import Layout from "@/components/Layout";
import RecordsTable from "@/components/records_table";
import Head from 'next/head';

const ExerRecords = () => {
    return ( <Layout>
        <Head><title>Exercise Records</title></Head>
        <div className="absolute overflow-scroll h-full w-full flex justify-center lg:pt-20 pt-7">
            <div className="w-4/5">
                <h1 className='font-mono font-bold xl:text-4xl 2xl:text-6xl text-cyan-blue'>Your Exercise Session Records</h1>
                <div className="lg:mt-7 mt-4">
                    <RecordsTable />
                </div>
            </div>

        </div>
        </Layout>
     );
}
 
export default ExerRecords;