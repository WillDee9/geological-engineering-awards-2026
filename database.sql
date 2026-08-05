create extension if not exists "uuid-ossp";

create table nominations (
  id uuid primary key default uuid_generate_v4(), nominator_name text not null, nominator_email text not null,
  nominee_name text not null, category text not null, reason text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')), created_at timestamptz not null default now()
);
create table candidates (
  id uuid primary key default uuid_generate_v4(), name text not null, category text not null, bio text, active boolean not null default true
);
create table payment_intents (
  reference text primary key, email text not null, candidate_ids uuid[] not null, amount integer not null,
  status text not null default 'initialized' check (status in ('initialized','paid')), paid_at timestamptz, created_at timestamptz not null default now()
);
create table votes (
  id uuid primary key default uuid_generate_v4(), candidate_id uuid not null references candidates(id), voter_email text not null,
  payment_reference text not null references payment_intents(reference), created_at timestamptz not null default now(), unique(candidate_id, payment_reference)
);

-- Development candidates used by the starter's ballot. Replace these with approved nominations later.
insert into candidates (id, name, category, bio) values
('11111111-1111-1111-1111-111111111111', 'Amara Mensah', 'Student of the Year', 'Final year Computer Science student'),
('22222222-2222-2222-2222-222222222222', 'David Okoro', 'Academic Star', 'Third year Software Engineering student');

-- The app uses the server-only service role; do not expose direct table access in the browser.
alter table nominations enable row level security; alter table candidates enable row level security; alter table payment_intents enable row level security; alter table votes enable row level security;
