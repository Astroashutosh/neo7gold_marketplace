import Swal from 'sweetalert2';

const popupCustomClass = {
  popup: 'border border-slate-700/80 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl backdrop-blur-xl',
  title: 'text-white font-bold text-lg',
  htmlContainer: 'text-slate-300 text-sm',
  confirmButton: 'px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all',
  cancelButton: 'px-4 py-2 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all ml-2',
};

export async function confirmActivate(entityName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Activate Account?',
    html: `Are you sure you want to <b>activate</b> <b>${entityName}</b>?<br/><span class="text-xs text-slate-400">The account status will be set to Active and access permissions will be restored.</span>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Activate',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10B981', // emerald
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export async function confirmInactivate(entityName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Inactivate Account?',
    html: `Are you sure you want to <b>inactivate</b> <b>${entityName}</b>?<br/><span class="text-xs text-slate-400">The account status will be set to Inactive.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Inactivate',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#F59E0B', // amber
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export async function confirmBlock(entityName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Block Account?',
    html: `Are you sure you want to <b class="text-red-400">BLOCK</b> <b>${entityName}</b>?<br/><span class="text-xs text-red-300/80">Account transactions and platform operations will be immediately suspended.</span>`,
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Yes, Block Account',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#EF4444', // red
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export async function confirmUnblock(entityName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Unblock Account?',
    html: `Are you sure you want to <b>unblock</b> <b>${entityName}</b>?<br/><span class="text-xs text-slate-400">Security restrictions will be removed and operational clearance restored.</span>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Unblock',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10B981', // emerald
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export function showSuccessAlert(title: string, text: string) {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    timer: 2500,
    showConfirmButton: false,
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });
}

export function showErrorAlert(title: string, text: string) {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    background: '#0F172A',
    color: '#F8FAFC',
    confirmButtonColor: '#EF4444',
    customClass: popupCustomClass,
  });
}

export async function showConfirmAlert(
  title: string,
  text: string,
  confirmButtonText: string = 'Yes, Confirm',
  cancelButtonTextOrIcon: string = 'Cancel',
  icon: 'warning' | 'question' | 'info' | 'error' | 'success' = 'warning'
): Promise<boolean> {
  const validIcons: Array<'warning' | 'question' | 'info' | 'error' | 'success'> = [
    'warning',
    'question',
    'info',
    'error',
    'success',
  ];

  let resolvedCancelText = 'Cancel';
  let resolvedIcon: 'warning' | 'question' | 'info' | 'error' | 'success' = 'question';

  if (validIcons.includes(cancelButtonTextOrIcon as any)) {
    resolvedIcon = cancelButtonTextOrIcon as any;
    resolvedCancelText = 'Cancel';
  } else {
    resolvedCancelText = cancelButtonTextOrIcon;
    resolvedIcon = validIcons.includes(icon) ? icon : 'question';
  }

  const result = await Swal.fire({
    title,
    text,
    icon: resolvedIcon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: resolvedCancelText,
    confirmButtonColor: '#D4AF37',
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export async function confirmDelete(entityName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Delete Record?',
    html: `Are you sure you want to delete <b>${entityName}</b>?<br/><span class="text-xs text-red-400">This action cannot be undone.</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  return result.isConfirmed;
}

export async function promptRequireRekyb(sellerName: string): Promise<{ confirmed: boolean; reason?: string }> {
  const result = await Swal.fire({
    title: 'Require Re-KYB Audit?',
    html: `Are you sure you want to require <b>${sellerName}</b> to undergo a <b>Re-KYB verification audit</b>?<br/><span class="text-xs text-slate-400">This will unlock the seller's compliance dashboard to edit and re-submit their legal entity and accreditation documents.</span>`,
    input: 'textarea',
    inputLabel: 'Reason for requiring Re-KYB (optional)',
    inputPlaceholder: 'e.g. Expired state assay license, changes to corporate structure or UBO...',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Unlock Re-KYB',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#D4AF37',
    cancelButtonColor: '#334155',
    background: '#0F172A',
    color: '#F8FAFC',
    customClass: popupCustomClass,
  });

  if (result.isConfirmed) {
    return { confirmed: true, reason: (result.value as string) || undefined };
  }
  return { confirmed: false };
}
