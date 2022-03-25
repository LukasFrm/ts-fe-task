import { useState, useEffect } from 'react';
import { Post } from '../../types';
import { useLocation, NavLink } from 'react-router-dom';

interface ITableProps {
  entries: Post[];
}

function Table({ entries }: ITableProps) {
  const [filteredEntries, setFilteredEntries] = useState<Post[]>(entries);
  const location = useLocation();

  useEffect(() => {
    const filterEntries = (filter: string): void => {
      switch (filter) {
        case '/evens':
          setFilteredEntries(entries.filter((x: Post) => x.id % 2 === 0));
          break;
        case '/odds':
          setFilteredEntries(entries.filter((x: Post) => x.id % 2 !== 0));
          break;
        default:
          setFilteredEntries(entries);
          break;
      }
    };
    filterEntries(location.pathname);
  }, [location, entries]);

  const checkActivePath = (path: any) => {
    if (location && location.pathname === path) return 'activeLink';
    else return '';
  };

  return (
    <table className="myTable">
      <thead>
        <NavLink to="/" className={() => checkActivePath('/')}>
          All
        </NavLink>
        <NavLink to="/odds" className={() => checkActivePath('/odds')}>
          Odds
        </NavLink>
        <NavLink to="/evens" className={() => checkActivePath('/evens')}>
          Evens
        </NavLink>
      </thead>
      <tbody>
        <tr className="header">
          <th>#</th>
          <th>Post</th>
        </tr>
        {filteredEntries.map((entry: Post) => {
          return (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
