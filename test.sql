SELECT waiter,
       CASE 
           WHEN customers.age >= 21 THEN 'Valid'
           ELSE 'Invalid'
       END AS age_check
FROM events
JOIN customers ON events.customer_id = customers.id
WHERE events.moment = 'current'
  AND events.what = 'offering'
  AND events.item = 'wine'
  AND events.location = 'cafe';


SELECT 
    waiter, 
    CASE 
        WHEN persons.age >= 21 
        THEN 'Valid' 
        ELSE 'Invalid' 
    END AS age_check 
FROM events 
JOIN persons 
    ON events.persons_id = persons.id 
WHERE 
    events.moment = 'current' 
    AND events.what = 'offering' 
    AND events.item = 'wine' 
    AND events.location = 'cafe';