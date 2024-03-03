import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { BrandSelect, Card, Pagination } from 'components';
import { useDebouncedState, useFieldsFetch, useFilterFetch, useGetIds, useItemsFetch } from 'hooks';

import { getCurrentPaginationItems, getPaginationData } from './App.helper';

const App: FC = () => {
  const { items: ids, getIds } = useGetIds();
  const { items, isLoading, getItems } = useItemsFetch();
  const { filteredItems, onFilterItems, isLoading: filterLoading } = useFilterFetch();
  const { fields, onGetFields } = useFieldsFetch();
  const [debounceSearch, setSearchValue] = useDebouncedState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 50,
    totalItems: 100,
  });
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredItems.length || ids.length,
    }));
  }, [filteredItems.length, ids.length]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const onSelectChange = useCallback((value: string) => {
    setSelectedBrand(value);
  }, []);

  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value), [setSearchValue]);

  useEffect(() => {
    if (ids.length > 0) {
      getItems(ids);
    }
  }, [getItems, ids]);

  useEffect(() => {
    getIds();
  }, [getIds]);

  useEffect(() => {
    onGetFields();
  }, [onGetFields]);

  useEffect(() => {
    onFilterItems({ product: debounceSearch, brand: selectedBrand });
  }, [debounceSearch, onFilterItems, selectedBrand]);

  const paginationData = useMemo(() => {
    return getPaginationData(pagination);
  }, [pagination]);

  const currentItems = useMemo(() => {
    return getCurrentPaginationItems({ ...pagination, filteredItems, items });
  }, [pagination, filteredItems, items]);

  return (
    <div className='wrapper'>
      <div className='flex items-center justify-between gap-4'>
        <BrandSelect onChange={onSelectChange} items={fields || ['']} />
        <input
          placeholder='Search'
          onChange={onSearchChange}
          className='mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <Pagination data={paginationData} pagination={pagination} onPageChange={onPageChange} />
        {isLoading || filterLoading ? <h2>Loading...</h2> : <Card items={currentItems} />}
      </div>
    </div>
  );
};

export default App;
