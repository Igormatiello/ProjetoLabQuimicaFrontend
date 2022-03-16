import { FormGroup, FormArray } from "@angular/forms";

export function getAllErrors(
    form: FormGroup | FormArray
): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors =
            control instanceof FormGroup || control instanceof FormArray
                ? this.getAllErrors(control)
                : control.errors;
        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any });
    return hasError ? result : null;
}

export function getCountErrors(form: FormGroup | FormArray): number {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors =
            control instanceof FormGroup || control instanceof FormArray
                ? this.getCountErrors(control)
                : control.errors;

        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any });

    return hasError ? Object.keys(result).length : 0;
}
