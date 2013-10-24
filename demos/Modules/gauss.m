M = ones(8,8);
a = gausswin(8);

for n = 1 : 8
    M(n,:) = a';
end

for n = 1 : 8
    M(:,n) = M(:,n)+a;
end

