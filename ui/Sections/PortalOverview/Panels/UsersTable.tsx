function UsersTable({ users }) {
  return (
    <div className="overflow-x-auto text-sm px-10 mb-8 rounded w-full mx-auto ">
      <table className="divide-y divide-zinc-200  border border-zinc-200 dark:border-zinc-800">
        <thead className="bg-zinc-50 dark:bg-black">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Full Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Avatar URL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Billing Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Payment Method
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Updated At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              Website
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
            >
              User Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-200 dark:bg-black">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.avatar_url || "---"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.billing_address || "---"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.payment_method || "---"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.updated_at}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.username || "---"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.website || "---"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.user_role || "---"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
