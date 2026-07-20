function PageHeader({ title }) {
  return (
    <div className="mx-auto my-12 w-4/5 rounded-3xl border-4 border-amber-800 bg-amber-50 px-12 py-8 shadow-xl">
      <h1 className="font-cinzel text-6xl text-amber-800 text-center">{title}</h1>
    </div>
  );
}

export default PageHeader;
