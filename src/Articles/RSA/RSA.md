# Short summary

My aim is to introduce linear congruencies, prove some lemmas about it, then use them to prove the Euler-Fermat Theorem, and then RSA itself. This article aims at introducing RSA as a very tame animal that is in fact extremely easy to understand.

# Linear congruencies

2 integers $a, b$ are said to be congruent modulo $m$ given that they produce the same remainder when divided by $m$. That means for some $k_0, k_1, r_0, m \in \mathbb{Z}, r_0 < m$ numbers $a$, $b$ can be expressed as:

$$
\begin{aligned}
& a = k_0m + r_0\\
& b = k_1m + r_0
\end{aligned}
$$

Then this inherently means:

$$
\begin{aligned}
& m \mid a - b\\
& a \equiv b \pmod{m}
\end{aligned}
$$

Please remember that the 2 entities on the 2 sides of the congruency can be any numbers. None of them strictly represent the common remainder. Without going deeper into the topic, I am going to show some very basic results about linear congruencies, only the ones essential for proving that RSA indeed works. Assume that the following 2 linear congruencies hold true:

$$
\begin{aligned}
& a \equiv b \pmod{m}\\
& c \equiv d \pmod{m}
\end{aligned}
$$

Then if the above congruencies hold, it is also true that:

$$
a \pm c \equiv b \pm d \pmod{m}
$$

It can be proven with remainders:

$$
\begin{aligned}
& a = k_0m + r_0\\
& b = k_1m + r_0\\
& c = k_2m + r_1\\
& d = k_3m + r_1
\end{aligned}
$$

From these it follows:

$$
\begin{aligned}
& a \pm c = (k_0m + r_0) \pm (k_2m + r_1) = q_0m + r_0 \pm r_1 \\
& b \pm d = (k_1m + r_0) \pm (k_3m + r_1) = q_1m + r_0 \pm r_1
\end{aligned}
$$

From these it follows:

$$
\begin{aligned}
q_0m + r_0 \pm r_1 &\equiv q_1m + r_0 \pm r_1 \pmod{m}\\
r_0 \pm r_1 &\equiv r_0 \pm r_1 \pmod{m}
\end{aligned}
$$

It can also be proven using divisibility:

$$
\begin{aligned}
& m \mid a - b \\
& m \mid c - d
\end{aligned}
$$

Then if two entities are divisible by a number then their sum or difference shoudl also be divisible by it:

$$
\begin{aligned}
& m \mid (a - b) + (c - d) = (a + c) - (b + d)  \\
& m \mid (a - b) - (c - d) = (a - c) - (b - d)
\end{aligned}
$$

Now we know that if the difference of 2 integers is divisible by a number if and only if they are congruent modulo that number. If you subtract them, and they produce the same remainder for $n$, then the result will be a multiple of $n$. Otherwise it just simply can not be. Therefore these results are equivalent with:

$$
\begin{aligned}
& a + c \equiv b + d \pmod{m}  \\
& a - c \equiv b - d \pmod{m}
\end{aligned}
$$

Given the initial 2 congruencies are 2, I am going to show that it is also true that:

$$
ac \equiv bd \pmod{m}
$$

Proof with remainders:

$$
\begin{aligned}
& a = k_0m + r_0\\
& b = k_1m + r_0\\
& c = k_2m + r_1\\
& d = k_3m + r_1
\end{aligned}
$$

From these we gain:

$$
\begin{aligned}
& ac = (k_0m + r_0)(k_2m + r_1) = q_0m + r_0r_1 \\
& bd = (k_1m + r_0)(k_3m + r_1) = q_1m + r_0r_1
\end{aligned}
$$

From this we actually obtain:

$$
ac \equiv bd \pmod{m}
$$

It can also be proven with divisibility:

$$
\begin{aligned}
& m \mid a - b\\
& m \mid c - d
\end{aligned}
$$

Now any multiple of numbers divisible by $m$ should still be divisible by $m$:

$$
\begin{aligned}
& m \mid c(a - b) = ac - bc\\
& m \mid b(c - d) = bc - bd
\end{aligned}
$$

Now that we know the sum of 2 integers divisible by $n$ shall also be divisible by $m$, we obtain that:

$$
m \mid (ac - bc) + (bc - db) = ac - db
$$

And since $m \mid a - b$ is equivalent with $a \equiv b \pmod{m}$ we get:

$$
ac \equiv db \pmod{m}
$$

That's cool! We need 1 more lemma before we can proceed to the Euler-Fermat Theorem.

$ac \equiv bc \pmod{m}$ is equivalent with $a \equiv b \pmod{\frac{m}{(m, c)}}$. Here equivalency only means that the 2 congruencies are true for the exact same set of solutions. None have a wider set of solutions than the other one. Proof:

Assume $ac \equiv bc \pmod{m}$. Then:

$$
m \mid ac - bc = c(a - b)
$$

Then let $d = (m, c)$. That is, $d$ shall be the greatest common divisor of $m$ and $c$. Then since we are unsure whether $(a - b)$ is divisible by $d$, we are required to remove these factors from the modulus in order to be sure that $m \mid (a - b)$ after the removal of factor $c$. Because we know that $c(a - b)$ contains every factor of $m$, but we can not know their distribution between $d$ and $a - b$. If $c$ has any prime factor $q$ such that it is common with $m$ but it is not common with $a - b$ then it would not be true that $m$ divides $a - b$. Any other (prime) factor of $c$, however, that is not common with $m$, can be removed without worry (if we may also keep them) because it does not change divisibility by $m$. So given that $c' = \frac{c}{d}$ it follows that this congruency is equivalent with:

$$
\frac{m}{d} \mid c'(a - b)
$$

And as mentioned, since $c'$ and $m$ has no factors in common, this is equivalent with:

$$
\frac{m}{d} \mid (a - b)
$$

That's even cooler is not it? With these lemmas we can now turn to proving the Euler-Fermat Theorem.

# Euler-Fermat Theorem

The theorem I am gonna prove is in fact Euler's Equation. Fermat's Little Theorem is a special case of the former result and also has a slightly different proof which I am not going to show. The statement of the theorem:

$$
\begin{aligned}
& a^{\phi(m)} \equiv 1 \pmod{m}\\
& (a, m) = 1
\end{aligned}
$$

So given $a$ and $m$ are relative primes (their greatest common divisor is 1) then $a$ raised to the power of the value given by Euler's phi function for $m$ should give a remainder of $1$ for $m$. Let's define the phi function!

Euler's phi function gives the number of all integers larger than $0$ and smaller than $m$ which are relatively prime to $m$. For example:

$$
\phi(10) = 4
$$

Because between $1$ and $9$, the following numbers are relatively prime to $10$: $1, 3, 7, 9$, and there are 4 of them. Our job is now to find out why rasing $a$ to the power of the value of this function gives such and interesting result.

Now I am going to introduce you to reduced residue systems. A set of unordered numbers is said to form a reduced residue system modulo $n$ given the following 3 properties hold:

First, there are exactly $\phi(m)$ numbers in the set.

Second, each of the numbers produce different remainders modulo $m$.

Third, each of these numbers are relatively prime to $m$.

That being said, the simplest example for an RRS modulo $10$ is ${1, 3, 7, 9}$. Of course, adding multiples of 10 to each will result in another RRS modulo $m$: ${11, 13, 17, 19}$ since it is immediately evident, that the same 3 conditions must hold true here as well. It is not just these 3 properties that are so much important. It is much rarely mentioned (because it is deemed way too trivial) that each RRS modulo $m$ gives the exact same remainders modulo $m$. So however trivial it may sound, let me, first and foremost, prove this rarely cared for fourth quality:

For proving this we first need to prove that if a number $a$ is relatively prime to $m$, then its remainder modulo $m$ shall also be relatively prime modulo $m$. We prove it indirectly, so let's assume that remainder $r$ of $a$ modulo $m$ happens NOT to be relatively prime to $m$, despite $a$ being relatively prime to $m$.

$$
a = km + r
$$

Now if $r$ was not relatively prime to $a$, it would mean that it must have at least one $q > 1$ common factor with $m$. But then since $km$ also contains this divisor because of $m$, we shall be able to factor it out as such:

$$
a = q\left(k\frac{m}{q} + \frac{r}{q}\right)
$$

But then if we can do that we are given a contradiction: this latter result means that $q \mid a$ and therefore it could not have been relatively prime to $a$, which was our assumed criterium. Therefore if $a$ is relatively prime to $m$ then its remainder must also be.

Okay now what implication does it have for us? We know that if $r$ is a remainder of $a$ modulo $n$, then it is true that $n > r \geq 0$. The simplest example for an RRS modulo $m$ is always those relative prime $a_i$ numbers for which it is true that $m > a_i \geq 1$. Now if we are given any other RRS modulo $m$, we are faced with the fact that they should INDEED produce these $a_i$ numbers as remainders modulo $m$, because each of them shall give different remainders, there are exactly $\phi(m)$ of them, and we also know that finally, that their remainders MUST BE relatively prime to $m$, so they are just simply ought not to be anything else than those numbers that Euler's phi function counts.

That having been proven, let's prove one more thing about RRSs:

**Lemma:** Given any RRS modulo $m$, multiplying each number $a_i$ in the RRS by a number $c$ that is relatively prime to $m$, shall result in another RRS modulo $m$.

Simply enough, we just need to verify whether all the 3 abovementioned qualities hold true. Since $a_i$ and $c$ both are relatively primes to $m$, their product shall also be. Therefore, the resulting numbers are also relatively prime to $m$. Since we initially had $\phi(m)$ numbers, we will end up with just as much, it is trivial. And proving that each of these produce different remainders modulo $m$ requires just a little more of work. Let's assume indirectly that $ca_i$ and $ca_j$ are two numbers that accidentally produce identical remainders modulo $m$:

$$
ca_i \equiv ca_j \pmod{m}
$$

Now due to the second lemma I proved for linear congruencies, we know that we shall obtain a congruency equivalent to this one by simply removing multiplier $c$, since $(c, m)=1$, therefore the new modulus shall be $\frac{m}{1}$, because we must divide the modulus by the greatest common divisor of $m$ and $c$, which coincidentally happens to be $1$ at the moment. So this is equivalent to:

$$
a_i \equiv a_j \pmod{m}
$$

And that one happens to be a contradiction, since our assumption also means that $a_i$ and $a_j$ were initially congruent to each other, whereas we know that they give different remainders modulo $m$. That means $ca_i$ and $ca_j$ are ought to have unique remainders modulo $m$.

And again since we have $\phi(m)$ numbers, each having unique AND relatively prime remainders modulo $m$, we know that these new nubmers must produce the exact same remainders modulo $m$. Now we can easily proceed to the conclusion of the most important result.

So let's consider any RRS modulo $m$, and let the constituent numbers be $a_0$, $a_1$, .., $a_{\phi(m)-1}$, and let any $c$ be a relatively prime to $m$. Then for every $a_i$ there is ought to be a $ca_j$ for which it is true that:

$$
a_i \equiv ca_j \pmod{m}
$$

So basically any number from the RRS can be paired up with another one which will produce the same remainder after multiplied by $c$. For all these pairs this above congruency holds true, and there's exactly $\phi(m)$ of these. As a result of the multiplication rule for linear congruencies, all these congruencies can be "multiplied together" and the product on both sides shall produce the same remainder modulo $m$ for each factor on side having a pair factor on the other producing the same remainder:

$$
a_0a_1a_2... \equiv ca_0ca_1ca_2... \pmod{m}
$$

Then you can collect all the $c$ factors on the right hand side and, big surprise, you will find that there is exactly $\phi(m)$ of it. So after rearrangement:

$$
a_0a_1a_2... \equiv c^{\phi(m)}a_0a_1a_2... \pmod{m}
$$

Now you see, $a_0a_1a_2...$ product is relatively prime to $m$, for each of its factors being relatively prime to $m$. In accordance with our lemma for equivalent division for linear congruencies, we can safely divide both sides by this factor without having to change the modulus, and thus we obtain:

$$
1 \equiv c^{\phi(m)} \pmod{m}
$$

# RSA Cryptography

Diffie-Hellman public key exchange protocol is the predecessor of RSA. It is a technic also based on linear crongruency equivalencies.

But it only served the purpose of agreeing upon a common cryptographic key through a public, vulnerable channel.

Then once everyone knows the key, they can use their symmetric cryptographic algorithm with it. RSA is different from it. It is an cryptographic algorithm itself,

while it is as safe on public channels. (That is, until the era of quantum computers sets in eventually). Every participant has a private and public key.

The public key is that one which is safe to be shared on the vulnerable channel. The public key can be used to encrypt a message with it,

and then the person who receives the message can decrypt it using his/her private key. We are about to find out how that is exactly possible.

All the mathematics behind RSA, knowing the lemmas above, can be concluded in nothing more than a few lines of linear congruencies.

The key is in the proving of the following:

$$
\begin{aligned}
& x^{k\phi(N) + 1} \equiv x \pmod{N}\\
& N = pq
\end{aligned}
$$

$p$ and $q$ are 300-digit prime numbers. The efficacy of RSA lies in the fact that pre-quantum computers can not effectively find out the prime factors of $N$.

Now consider the case, when $x$ happens to be relatively prime with $N$. In that case we are done with the proof, since this congruency is easily derived from the Euler-Fermat theorem.

below we use the multiplication rule for linear congruencies, we just multiply by the same linear congruency:

$$
\begin{aligned}
& a \equiv x \pmod{N}\\
& a \equiv x \pmod{N}\\
& \implies a^2 \equiv x^2 \pmod{N}
\end{aligned}
$$

$$
\begin{aligned}
& x^{\phi(N)} \equiv 1 \pmod{N}\\
& x^{k\phi(N)} \equiv 1^k \pmod{N}\\
& x^{k\phi(N)} \equiv 1 \pmod{N}\\
& x^{k\phi(N) + 1} \equiv x \pmod{N}
\end{aligned}
$$

So there we go actually. We only need to do some more proving in case $x$ is assumed not to be relatively prime to $N$.

Let's look at one other, very trivial case, when $x$ happens to be divisible by both $p$ and $q$. In that case, since $N$ in this case is a divisor of $x$:

$$
\begin{aligned}
& x \equiv 0 \pmod{N}\\
& x^{k\phi(N)} \equiv 0^k \pmod{N}\\
& x^{k\phi(N)} \equiv 0 \pmod{N}\\
& x^{k\phi(N) + 1} \equiv 0 \pmod{N}\\
& \implies x^{k\phi(N) + 1} \equiv x \pmod{N}
\end{aligned}
$$

Isn't it EZ? We are left with one more case. What if $x$ is only divisible by either $p$ or $q$?

Let's assume so, that, for example, $p \nmid x$ but $q \mid x$. Due to Euler-Fermat Theorem:

$$
\begin{aligned}
& x^{\phi(p)} \equiv 1 \pmod{p}\\
& x^{k\phi(q)\phi(p)} \equiv 1^k \pmod{p}\\
& x^{k\phi(q)\phi(p)} \equiv 1 \pmod{p}\\
& \implies x^{k\phi(N)} \equiv 1 \pmod{p}
\end{aligned}
$$

In the last step, we have done a transformation based on an identity: $\phi(N) = \phi(pq)=\phi(p)\phi(q)$.

I am going to prove it now. It is important that $p$ and $q$ are relatively prime. In generality, they are not even required to be primes, only relative primes, that is, they may be compound but should not have common factors.

Now, if we wish to count all the numbers relatively prime to $N$ below $N$, it is the same task, by commonsense, as if we were to count those that are relatively prime to $p$ and $q$, below $N$. Now, imagine a table-like resolution of all the numbers from 1 until $N$. We have $p$ number of columns, and $q$ number of rows. In the first row, you get to see the first $p$ integers, in the second the next $p$ integers from $p + 1$ to $2p$. Let $i$ denote the number of a row, and $j$ denote the number of a column. Then we gain the following resolution for a number $a$ at row $i$ and column $j$:

$$
a_{i,j} = p(i - 1) + j
$$

And now we wish to prove that in this table, we have $\phi(p)\phi(q)$ numbers that are relatively primes to $N$, or equivalently, relatively primes to both $q$ and $p$. We first show that only those numbers fit this criterion, whose column numbers happen to be relatively prime to $p$. By commonsense:

$$
p(i - 1) + j \equiv j \pmod{p}
$$

Now, here, we what we need to prove that, if two entities are congruent modulo $m$, then both of these numbers must have the same greatest common divisor with $m$.

$$
\begin{aligned}
& a \equiv b \pmod{p}\\
& d = (a, m)\\
& \implies d \mid a\\
& \implies m \mid a - b\\
& \implies d \mid a - b\\
& \implies d \mid a - (a - b)\\
& \implies d \mid b
\end{aligned}
$$

The line just above, the main result is due to the fact that the difference of 2 numbers divisible by some other number must also be divisible by it.

Now this result has an important implication: for linear congruency to hold true, the two congruent numbers must have the same greatest common divisor with the modulus.

Now, what this means for us is:

$$
\begin{aligned}
& p(i - 1) + j \equiv j \pmod{p}\\
& \implies (j, p) = (p(i - 1) + j) = 1
\end{aligned}
$$

This effectively means that our number $a_{i,j}$ must be relative prime to $p$, given the column number $j$ is relatively prime to $j$.

And we have, all in all, $\phi(p)$ such columns. We need to show that in each such column we have $\phi(q)$ numbers that are relative primes of $q$.

We show that in each column, none of the numbers are congruent pairwise. This means each number in the column is ought to have a unique remainder modulo $q$.

We prove it indirectly. Let's assume two randomly selected elements in the same column produce the same remainder. For that we make the column number fix.

$$
\begin{aligned}
& p(i_0 - 1) + j \equiv p(i_1 - 1) + j \pmod{q}\\
& p(i_0 - 1) \equiv p(i_1 - 1) \pmod{q}\\
& i_0 - 1 \equiv i_1 - 1 \pmod{q}\\
& i_0 \equiv i_1 \pmod{q}
\end{aligned}
$$

First we subtracted $j$ from both sides, we can do that because $j \equiv j \pmod{q}$.

Then, we divided by $p$, and we could do that without altering the modulus, since $(p, q) = 1$.

Then, we added 1 to both sides.

Eventually, we came to the conclusion, that the row numbers shall be congruent modulo $q$.

That is of course contradiction, since each of the row numbers are between $1$ and $q$.

Therefore, each of the row numbers represent one of the remainders of $q$, and each one occurs only once.

That means, each number in our column is required to produce a unique remainder modulo $q$.

Therefore, we have $\phi(p)$ columns in which we have numbers that matter,

and in each such column, since no two can produce the same remainder modulo $q$, there must be exactly $\phi(q)$

numbers that are congruent not just to $p$, but also to $q$.

Hence,

$$
\phi(q, p)=\phi(q)\phi(p)
$$

So we proceed with the congruency:

$$
\begin{aligned}
& x^{k\phi(N)} \equiv 1 \pmod{p}\\
& x^{k\phi(N) + 1} \equiv x \pmod{p}\\
& \implies p \mid x^{k\phi(N) + 1} - x\\
& q \mid x\\
& \implies q \mid x^{k\phi(N) + 1} - x\\
& \implies pq \mid x^{k\phi(N) + 1} - x\\
& \implies N \mid x^{k\phi(N) + 1} - x
\end{aligned}
$$

So what we can see here, is that since $q$ divides $x$, it must also divide the difference of $x$ given any power of it.

But then if both $p$ and $q$ divides this difference, $N$ should as well. This leads us to the final result:

$$
x^{k\phi(N) + 1} \equiv x \pmod{N}
$$

Ok so, we have shown that this congruency holds true for any value of $x$.

The only question is, how could we use it for cryptography?

We need a public key $a$, and private key $b$. We need a cryptographic function such that:

$$
x^a \equiv c \pmod{N}
$$

Here $c$ is your ciphertext, resulting from public key $a$ and plaintext $x$.

$x$ is your message that you are encrypting.

Now we need such a private key $b$, for which:

$$
\begin{aligned}
& (x^a)^b \equiv c \pmod{N}\\
& x^{ab} \equiv x \pmod{N}
\end{aligned}
$$

Now, due to the above result, for this to hold true:

$$
\begin{aligned}
& ab = k\phi(N)+1\\
& \implies ab \equiv 1 \pmod{\phi(N)}
\end{aligned}
$$

That means, any key combination of $a$ and $b$ will be good, given this congruency holds true for them.

There is a very easy, effective way of calculating a pair for a given key.

A clever way of using Euclidean's algorithm will effectively calculate a key pair.

Please note that in order to even have a chance to find a solution, given key $a$ is given, and $b$ is to be calculated, it is essential that $(a, \phi(N))=1$. That is because, as we have shown it, if $a \equiv b \pmod{m}$ then $(a, m)=(b, m)$.

And here, $(1, \phi(N))=1$, therefore $a$ must also be relative prime to $\phi(N)$.

But this is also the reason why Euclidean's algorithm can be used, since it ensures that we gain a greatest common divisor of $1$.

You need to write another linear congruency beside this one:

$$
\begin{aligned}
& ab = k\phi(N)+1\\
& \phi(N)b \equiv 0 \pmod{\phi(N)}
\end{aligned}
$$

Now you perform Euclidean's algorithm on the numbers on the left hand side, and the ones on the right hand side, in parallel.

Remember that $b$ is the only unknown here.

The fact that $(ab, \phi(N))=1$ is the thing that guarantees that eventually end up with a linear congruency such that $1b \equiv c \pmod{N}$,

where $c$ is a constant, the resulting key.
