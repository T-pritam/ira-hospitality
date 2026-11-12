// Contact + career application forms.
// Same endpoints and payloads as the current live site, so the existing backend keeps working:
//   POST {api}/contacts      JSON  { name, email, phone, message, source }
//   POST {api}/applications  multipart { jobId, fullName, email, phone, education, experience, skills, resume }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIMEOUT_MS = 60000; // the backend can take a while to wake up

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const digits = (v: string) => v.replace(/\D/g, '');
function phoneOk(v: string) {
  let d = digits(v);
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.length === 10 || (v.trim().startsWith('+') && d.length >= 8 && d.length <= 15);
}

function messageFor(el: FieldEl): string {
  const v = el.value.trim();
  const name = el.dataset.label || 'This field';
  if (el instanceof HTMLInputElement && el.type === 'file') {
    if (el.required && !el.files?.length) return el.dataset.msgRequired || 'Please upload your resume';
    return '';
  }
  if (el.required && !v) return el.dataset.msgRequired || `${name} is required`;
  if (!v) return '';
  if (el.type === 'email' && !EMAIL_RE.test(v)) return 'Please enter a valid email address';
  if (el.dataset.phone !== undefined && !phoneOk(v)) return 'Phone number must be 10 digits';
  return '';
}

function setError(el: FieldEl, msg: string) {
  const field = el.closest('.field');
  const errId = `${el.id}-error`;
  let err = document.getElementById(errId);
  if (!err && field) {
    err = document.createElement('p');
    err.id = errId;
    err.className = 'field__error';
    field.appendChild(err);
  }
  if (err) err.textContent = msg;
  field?.classList.toggle('has-error', !!msg);
  el.setAttribute('aria-invalid', String(!!msg));
  const described = new Set((el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
  described.add(errId);
  el.setAttribute('aria-describedby', [...described].join(' '));
}

function validate(form: HTMLFormElement): FieldEl | null {
  let first: FieldEl | null = null;
  form.querySelectorAll<FieldEl>('input:not([type=hidden]):not(.hp input), textarea, select').forEach((el) => {
    if (el.closest('.hp') || el.dataset.skipValidate !== undefined) return;
    const msg = messageFor(el);
    setError(el, msg);
    if (msg && !first) first = el;
  });
  return first;
}

function liveValidation(form: HTMLFormElement) {
  form.addEventListener('blur', (e) => {
    const el = e.target as FieldEl;
    if (!el.matches?.('input, textarea, select') || el.closest('.hp')) return;
    if (el.value || el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el));
  }, true);
  form.addEventListener('input', (e) => {
    const el = e.target as FieldEl;
    if (el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el));
  });
}

function status(form: HTMLFormElement, kind: 'success' | 'error' | null, text = '') {
  const box = form.querySelector<HTMLElement>('[data-status]');
  if (!box) return;
  box.className = 'form__status' + (kind ? ` is-${kind}` : '');
  const icon = kind === 'success'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/></svg>';
  box.innerHTML = kind ? `${icon}<span>${text}</span>` : '';
}

function setLoading(form: HTMLFormElement, loading: boolean) {
  const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
  const label = btn?.querySelector<HTMLElement>('.btn__label');
  form.classList.toggle('is-loading', loading);
  form.setAttribute('aria-busy', String(loading));
  if (btn) btn.disabled = loading;
  if (label) {
    label.dataset.idle ??= label.textContent || '';
    label.textContent = loading ? 'Sending…' : label.dataset.idle;
  }
}

async function send(url: string, init: RequestInit, onSlow: () => void) {
  const ctrl = new AbortController();
  const slow = setTimeout(onSlow, 7000);
  const kill = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } finally {
    clearTimeout(slow);
    clearTimeout(kill);
  }
}

/* ---------------- Contact form ---------------- */
function initContact(form: HTMLFormElement) {
  liveValidation(form);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status(form, null);
    const bad = validate(form);
    if (bad) { bad.focus(); return; }
    const data = new FormData(form);
    if (String(data.get('company_website') || '')) { // honeypot: silently accept bots
      status(form, 'success', 'Message sent successfully! We’ll get back to you soon.');
      form.reset();
      return;
    }
    setLoading(form, true);
    try {
      await send(form.dataset.endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name')).trim(),
          email: String(data.get('email')).trim(),
          phone: String(data.get('phone')).trim(),
          message: String(data.get('message')).trim(),
          source: form.dataset.source || 'contact_page',
        }),
      }, () => status(form, 'success', 'Still sending, our server is waking up. This can take a few seconds…'));
      form.reset();
      form.querySelectorAll('.has-error').forEach((f) => f.classList.remove('has-error'));
      status(form, 'success', 'Message sent successfully! We’ll get back to you soon.');
    } catch {
      status(form, 'error', `Failed to send message. Please try again, or email us at <a href="mailto:studio@irahospitality.co.in">studio@irahospitality.co.in</a>.`);
    } finally {
      setLoading(form, false);
      form.querySelector<HTMLElement>('[data-status]')?.focus();
    }
  });
}

/* ---------------- Career application ---------------- */
function initApplication(form: HTMLFormElement) {
  liveValidation(form);
  let uid = 0;

  // Repeatable rows (education / experience)
  form.querySelectorAll<HTMLElement>('[data-repeat]').forEach((group) => {
    const tpl = group.querySelector<HTMLTemplateElement>('template')!;
    const list = group.querySelector<HTMLElement>('[data-repeat-list]')!;
    const add = () => {
      const frag = tpl.content.cloneNode(true) as DocumentFragment;
      const n = ++uid;
      frag.querySelectorAll<HTMLElement>('[id]').forEach((el) => { el.id = `${el.id}-${n}`; });
      frag.querySelectorAll<HTMLLabelElement>('label[for]').forEach((l) => { l.htmlFor = `${l.htmlFor}-${n}`; });
      list.appendChild(frag);
      refreshRemove();
    };
    const refreshRemove = () => {
      const blocks = list.querySelectorAll('.repeat-block');
      blocks.forEach((b) => { (b.querySelector('.repeat-remove') as HTMLElement).hidden = blocks.length === 1; });
    };
    list.addEventListener('click', (e) => {
      const rm = (e.target as HTMLElement).closest('.repeat-remove');
      if (rm) { rm.closest('.repeat-block')?.remove(); refreshRemove(); }
    });
    group.querySelector('[data-repeat-add]')?.addEventListener('click', () => {
      add();
      list.querySelector<HTMLInputElement>('.repeat-block:last-child input')?.focus();
    });
    add();
  });

  // Skills as tags
  const skills: string[] = [];
  const skillInput = form.querySelector<HTMLInputElement>('[data-skill-input]')!;
  const skillList = form.querySelector<HTMLElement>('[data-skill-list]')!;
  const skillError = form.querySelector<HTMLElement>('[data-skill-error]')!;
  const renderSkills = () => {
    skillList.innerHTML = '';
    skills.forEach((s, i) => {
      const li = document.createElement('li');
      li.className = 'skill';
      li.textContent = s;
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Remove ${s}`);
      b.textContent = '×';
      b.addEventListener('click', () => { skills.splice(i, 1); renderSkills(); skillInput.focus(); });
      li.appendChild(b);
      skillList.appendChild(li);
    });
    if (skills.length) skillError.textContent = '';
  };
  const addSkill = () => {
    const v = skillInput.value.trim();
    if (v && !skills.some((s) => s.toLowerCase() === v.toLowerCase())) skills.push(v);
    skillInput.value = '';
    renderSkills();
  };
  skillInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } });
  form.querySelector('[data-skill-add]')?.addEventListener('click', addSkill);

  // Resume
  const file = form.querySelector<HTMLInputElement>('input[type=file]')!;
  const drop = form.querySelector<HTMLElement>('[data-dropzone]')!;
  const fileName = form.querySelector<HTMLElement>('[data-file-name]')!;
  const checkFile = () => {
    const f = file.files?.[0];
    let msg = '';
    if (f && f.size > 5 * 1024 * 1024) msg = 'Resume must be 5 MB or smaller';
    else if (f && !/\.(pdf|docx?)$/i.test(f.name)) msg = 'Please upload a PDF, DOC or DOCX file';
    if (msg) { file.value = ''; }
    fileName.textContent = file.files?.[0] ? `Selected: ${file.files[0].name}` : '';
    setError(file, msg);
  };
  file.addEventListener('change', checkFile);
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('is-drag'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, () => drop.classList.remove('is-drag')));
  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files.length) { file.files = e.dataTransfer.files; checkFile(); }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status(form, null);
    if (skillInput.value.trim()) addSkill();
    let bad: HTMLElement | null = validate(form);
    if (!skills.length) {
      skillError.textContent = 'Please add at least one skill';
      bad ??= skillInput;
    }
    if (bad) { bad.focus(); return; }

    const rows = (sel: string, keys: string[]) =>
      Array.from(form.querySelectorAll<HTMLElement>(`${sel} .repeat-block`)).map((b) =>
        Object.fromEntries(keys.map((k) => [k, (b.querySelector<HTMLInputElement>(`[data-key="${k}"]`)?.value || '').trim()])));

    const fd = new FormData();
    fd.append('jobId', form.dataset.jobId!);
    fd.append('fullName', (form.elements.namedItem('fullName') as HTMLInputElement).value.trim());
    fd.append('email', (form.elements.namedItem('email') as HTMLInputElement).value.trim());
    fd.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value.trim());
    fd.append('education', JSON.stringify(rows('[data-repeat="education"]', ['degree', 'specialization', 'institution'])));
    fd.append('experience', JSON.stringify(rows('[data-repeat="experience"]', ['role', 'company', 'startDate', 'endDate'])));
    fd.append('skills', JSON.stringify(skills));
    fd.append('resume', file.files![0]);

    setLoading(form, true);
    try {
      await send(form.dataset.endpoint!, { method: 'POST', body: fd },
        () => status(form, 'success', 'Still uploading, our server is waking up. This can take a few seconds…'));
      form.hidden = true;
      const done = document.querySelector<HTMLElement>('[data-application-done]');
      if (done) { done.hidden = false; done.focus(); }
    } catch {
      status(form, 'error', 'Failed to submit application. Please try again.');
      form.querySelector<HTMLElement>('[data-status]')?.focus();
    } finally {
      setLoading(form, false);
    }
  });
}

export function init() {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    form.noValidate = true;
    if (form.dataset.form === 'contact') initContact(form);
    if (form.dataset.form === 'application') initApplication(form);
  });
}
