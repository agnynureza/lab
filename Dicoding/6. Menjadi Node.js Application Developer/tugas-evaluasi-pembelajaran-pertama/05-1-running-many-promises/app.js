const { getUserInfo, getUserOrders, getUserCartItems } = require('./utils');

function getUserData(userId) {
  /**
   * @TODO
   * Dapatkan nilai:
   *  1. `userInfo` dari fungsi `getUserInfo`
   *  2. `userOrders` dari fungsi `getUserOrders`
   *  3. `userCartItems` dari fungsi `getUserCartItems`
   *
   *  Kemudian kembalikan fungsi asinkron ini dengan nilai-nilai di atas dalam bentuk objek.
   *  Struktur objek yang diharapkan dari yang dikembalikan oleh fungsi ini:
   *  {
   *    userInfo: { ... }
   *    userOrders: [ ... ],
   *    userCartItems: [ ... ]
   *  }
   *
   *  Jika ada salah satu Promise yang rejected, kembalikan fungsi ini dengan nilai `null`.
   */
  let userInfoPromise = getUserInfo(userId);
  let userOrdersPromise = getUserOrders(userId);
  let userCartItemsPromise = getUserCartItems(userId);

  return Promise.all([userInfoPromise, userOrdersPromise, userCartItemsPromise])
          .then(([userInfo, userOrders, userCartItems]) => ({
            userInfo,
            userOrders,
            userCartItems
          }))
          .catch(() => null);
}

function main() {
  getUserData(1).then(console.log);
  getUserData(-1).then(console.log); // seharusnya mencetak "null"
}

main();
