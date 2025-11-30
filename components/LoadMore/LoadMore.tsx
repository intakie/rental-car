// 'use client';
// import { useCarStore } from '@/lib/store/carStore';

// export default function LoadMore() {
//   const { page, totalPages, loadMore, loading } = useCarStore();
//   console.log(
//     'LoadMore - page:',
//     page,
//     'totalPages:',
//     totalPages,
//     'loading:',
//     loading
//   );

//   if (page >= totalPages) return null;

//   return (
//     <div style={{ marginTop: 16, textAlign: 'center' }}>
//       <button
//         className="btn btn-primary"
//         onClick={() => loadMore()}
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : 'Load More'}
//       </button>
//     </div>
//   );
// }

//!!!!!*/

// 'use client';
// import { useCarStore } from '@/lib/store/carStore';

// export default function LoadMore() {
//   const { page, totalPages, loadMore, loading } = useCarStore();

//   if (page >= totalPages) return null;

//   return (
//     <div style={{ marginTop: 16, textAlign: 'center' }}>
//       <button className="btn btn-primary" onClick={loadMore} disabled={loading}>
//         {loading ? 'Loading...' : 'Load more'}
//       </button>
//     </div>
//   );
// }

//!!!!*/

// 'use client';
// import { useCarStore } from '@/lib/store/carStore';
// import styles from './LoadMore.module.css';

// export default function LoadMore() {
//   const { page, totalPages, loadMore, loading } = useCarStore();

//   if (page >= totalPages) return null;

//   return (
//     <div className={styles.wrapper}>
//       <button className={styles.button} onClick={loadMore} disabled={loading}>
//         {loading ? 'Loading...' : 'Load more'}
//       </button>
//     </div>
//   );
// }

//!!!

'use client';
import { useCarStore } from '@/lib/store/carStore';
import styles from './LoadMore.module.css';

export default function LoadMore() {
  const { page, totalPages, loadMore, loading, cars } = useCarStore();

  console.log(
    'LoadMore - page:',
    page,
    'totalPages:',
    totalPages,
    'loading:',
    loading,
    'cars count:',
    cars.length
  );

  if (page >= totalPages || cars.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={loadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}

//!!!

// 'use client';
// import { useCarStore } from '@/lib/store/carStore';
// import styles from './LoadMore.module.css';

// export default function LoadMore() {
//   const { page, totalPages, loadMore, loading, cars } = useCarStore();

//   console.log(
//     'LoadMore render - page:',
//     page,
//     'totalPages:',
//     totalPages,
//     'loading:',
//     loading,
//     'cars count:',
//     cars.length
//   );

//   const handleLoadMore = async () => {
//     console.log(
//       'LoadMore button clicked - current page:',
//       page,
//       'totalPages:',
//       totalPages
//     );
//     await loadMore();
//     // Після завантаження перевіримо стан
//     setTimeout(() => {
//       const state = useCarStore.getState();
//       console.log(
//         'After loadMore - page:',
//         state.page,
//         'totalPages:',
//         state.totalPages,
//         'cars:',
//         state.cars.length
//       );
//     }, 100);
//   };

//   if (page >= totalPages) {
//     console.log('LoadMore hidden - page >= totalPages', page, '>=', totalPages);
//     return null;
//   }

//   if (cars.length === 0) {
//     console.log('LoadMore hidden - no cars');
//     return null;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <button
//         className={styles.button}
//         onClick={handleLoadMore}
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : 'Load more'}
//       </button>
//     </div>
//   );
// }
