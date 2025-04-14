export const getServerSideProps = async () => {
  // Fetch data from external API
  const asad = "foobar";
  console.log(asad);
  // Pass data to the page via props
  return { props: { asad } };
};

export default function Page({ asad }) {
  return (
    <main>
      <p>{asad}</p>
    </main>
  );
}
