-- Comando para desabilitar o modo de segurança e permitir exclusões e alterações gerais.
USE PACER;

SET SQL_SAFE_UPDATES = 0;

-- ROLE
-- delete from role;
insert into role (id_role, roleName, created_at, updated_at) values ('ALUNO'    ,'Aluno'    ,'2021-10-01','2021-10-31');
insert into role (id_role, roleName, created_at, updated_at) values ('PROFESSOR','Professor','2021-10-01','2021-10-31');
insert into role (id_role, roleName, created_at, updated_at) values ('ADMIN'    ,'Admin'    ,'2021-10-01','2021-10-31');
commit;

-- USER
-- delete from user;

insert into user (id_user, login, nome, document, email, role, sn_ativo) values ('11','PROJOSE' ,'José' ,''            ,'jose@fatec-pacer.sp.gov.br' ,'PROFESSOR','S');
insert into user (id_user, login, nome, document, email, role, sn_ativo) values ('12','PROMARIA','Maria','2345'        ,'maria@fatec-pacer.sp.gov.br','PROFESSOR','S');
insert into user (id_user, login, nome, document, email, role, sn_ativo) values ('22','BD1234'  ,'Aiata','141414141414','aiata@fatec-pacer.sp.gov.br','ALUNO'    ,'S');
commit;

-- USER USER_ROLE
-- delete from user_role;
insert into user_role (id_user_role, created_at, updated_at, id_user, id_role) values ('1','2021-10-01','2021-10-01','11','PROFESSOR');
insert into user_role (id_user_role, created_at, updated_at, id_user, id_role) values ('2','2021-10-01','2021-10-01','12','PROFESSOR');
insert into user_role (id_user_role, created_at, updated_at, id_user, id_role) values ('3','2021-10-01','2021-10-01','22','ALUNO');
commit;

-- CRITERIA
insert into criteria (id_criteria,desc_criteria,sn_ativo) values ('1','Proatividade','S');
insert into criteria (id_criteria,desc_criteria,sn_ativo) values ('2','Autonomia','S');
insert into criteria (id_criteria,desc_criteria,sn_ativo) values ('3','Colaboração','S');
insert into criteria (id_criteria,desc_criteria,sn_ativo) values ('4','Entrega de Resultados','S');
commit;
-- select * from criteria;


-- PROJECT
insert into project (id_project, dt_opening, dt_close, description) values (1,'2021-06-01','2021-12-31','PACER 6º BD');
insert into project (id_project, dt_opening, dt_close, description) values (2,'2021-06-01','2021-12-31','API 5º BD');
commit;

-- SPRINT
insert into sprint (id_sprint,initial_date, final_date,id_project) values (1,'2021-10-01','2021-10-31',1);
insert into sprint (id_sprint,initial_date, final_date,id_project) values (2,'2021-11-01','2021-11-30',1);
insert into sprint (id_sprint,initial_date, final_date,id_project) values (3,'2021-12-01','2021-11-20',1);
commit;

-- NOTES_STORE
-- delete from notes_store;
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (1,11,22,1,1,1);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (2,11,22,1,2,1);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (3,11,22,1,3,1);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (4,11,22,1,4,1);
    
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint,note) values (5,12,22,1,1,1,2);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint,note) values (6,12,22,1,2,1,3);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (7,12,22,1,3,1);
insert into notes_store (id_evaluation,id_evaluator,id_evaluated,id_group,id_criteria,id_sprint) values (8,12,22,1,4,1);
commit;

select * from notes_store order by id_evaluation, id_evaluator;    

delete from notes_store;