const Granted = "granted";

export async function queryPermission(name: PermissionName): Promise<boolean> {
    return navigator.permissions.query({
        name: name
    }).then((results: PermissionStatus) => {
        return results.state === Granted;
    });
}
