function PageHeader({ title }) {
  return (
    <div className="mx-auto my-4 w-11/12 max-w-5xl rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-amber-800 bg-amber-50 py-4 shadow-xl sm:px-8 md:px-12">
      <h1 className="text-center font-cinzel text-2xl sm:text-3xl md:text-5xl text-amber-800">
        {title}
      </h1>
    </div>
  );
}

export default PageHeader;
