-- Implementation
	To my knowledge, all aspects are correctly implemented
-- Collaboration
	None
-- Time Spent
	40 minutes
-- Question:  is it possible to request the data from a different origin?
	No, it is not possible to use javascript to request data from a different origin.
	Back in the day, this was possible - which allowed websites to potentially serve malicious
	content without hosting it themselves.
	
	There are hacky workarounds, such as setting the current domain to a valid 'superdomain' of the
	originally accessed page - but this still prevents the cross-site scripting attacks mentioned above.
	
	If this were not the case, merely logging in to another website would allow a wannabe hacker to read
	my email or edit my Facebook status - or steal my credit card numbers.