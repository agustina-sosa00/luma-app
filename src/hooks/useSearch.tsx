import { useState } from 'react';

export default function useSearch() {
  const [searchText, setSearchText] = useState<string>('');
  const [searching, setSearching] = useState<string>('');

  function handleonSearch() {
    setSearching(searchText);
  }
  function handleClearSearch() {
    setSearchText('');
    setSearching('');
  }

  return { searchText, setSearchText, searching, setSearching, handleonSearch, handleClearSearch };
}
